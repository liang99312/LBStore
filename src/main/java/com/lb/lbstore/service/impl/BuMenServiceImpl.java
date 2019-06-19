/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.BuMenDao;
import com.lb.lbstore.domain.BuMen;
import com.lb.lbstore.service.BuMenService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("buMenServiceImpl")
public class BuMenServiceImpl implements BuMenService {

    @Autowired
    private BuMenDao buMenDao;

    @Override
    public BuMen getBuMenById(Integer id) {
        return (BuMen) buMenDao.findObjectById(BuMen.class, id);
    }

    @Override
    public List<BuMen> getAllBuMens(Integer qy_id) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        return buMenDao.getResult("from BuMen buMen where qy_id=?", parameters.toArray());
    }

    @Override
    public boolean updateBuMen(BuMen buMen) {
        return buMenDao.update(buMen);
    }

    @Override
    public BuMen saveBuMen(BuMen buMen) {
        int id = buMenDao.save(buMen);
        return (BuMen) buMenDao.findObjectById(BuMen.class, id);
    }

    @Override
    public boolean deleteBuMen(Integer id) {
        BuMen buMen = (BuMen) buMenDao.findObjectById(BuMen.class, id);
        if (buMen.getState() == 0) {
            buMen.setState(-1);
            return buMenDao.update(buMen);
        } else if (buMen.getState() == -1) {
            return buMenDao.deleteObjById("buMen", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from BuMen where qy_id=?";
        if (map.containsKey("mc")) {
            sql += " and mc like '%?%'";
            parameters.add(map.get("mc"));
        }
        if (map.containsKey("state")) {
            sql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return buMenDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<BuMen> queryBuMensByPage(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String hql = "from BuMen where qy_id=?";
        if (map.containsKey("mc")) {
            hql += " and mc like '%?%'";
            parameters.add(map.get("mc"));
        }
        if (map.containsKey("state")) {
            hql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return buMenDao.getPageList(hql, parameters.toArray(), Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

    @Override
    public boolean existBuMen(Integer qy_id, Integer id, String mc) {
        return buMenDao.existBuMen(qy_id, id, mc);
    }

}
