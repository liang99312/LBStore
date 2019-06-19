/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.WuZiLeiBieDao;
import com.lb.lbstore.domain.WuZiLeiBie;
import com.lb.lbstore.service.WuZiLeiBieService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("wuZiLeiBieServiceImpl")
public class WuZiLeiBieServiceImpl implements WuZiLeiBieService {

    @Autowired
    private WuZiLeiBieDao wuZiLeiBieDao;

    @Override
    public WuZiLeiBie getWuZiLeiBieById(Integer id) {
        return (WuZiLeiBie) wuZiLeiBieDao.findObjectById(WuZiLeiBie.class, id);
    }

    @Override
    public List<WuZiLeiBie> getAllWuZiLeiBies(Integer qy_id) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        return wuZiLeiBieDao.getResult("from WuZiLeiBie wuZiLeiBie where qy_id=?", parameters.toArray());
    }

    @Override
    public boolean updateWuZiLeiBie(WuZiLeiBie wuZiLeiBie) {
        return wuZiLeiBieDao.update(wuZiLeiBie);
    }

    @Override
    public WuZiLeiBie saveWuZiLeiBie(WuZiLeiBie wuZiLeiBie) {
        int id = wuZiLeiBieDao.save(wuZiLeiBie);
        return (WuZiLeiBie) wuZiLeiBieDao.findObjectById(WuZiLeiBie.class, id);
    }

    @Override
    public boolean deleteWuZiLeiBie(Integer id) {
        WuZiLeiBie wuZiLeiBie = (WuZiLeiBie) wuZiLeiBieDao.findObjectById(WuZiLeiBie.class, id);
        if (wuZiLeiBie.getState() == 0) {
            wuZiLeiBie.setState(-1);
            return wuZiLeiBieDao.update(wuZiLeiBie);
        } else if (wuZiLeiBie.getState() == -1) {
            return wuZiLeiBieDao.deleteObjById("wuZiLeiBie", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from WuZiLeiBie where qy_id=?";
        if (map.containsKey("mc")) {
            sql += " and mc like ?";
            parameters.add("%" + map.get("mc") + "%");
        }
        if (map.containsKey("state")) {
            sql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return wuZiLeiBieDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<WuZiLeiBie> queryWuZiLeiBiesByPage(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String hql = "from WuZiLeiBie where qy_id=?";
        if (map.containsKey("mc")) {
            hql += " and mc like ?";
            parameters.add("%" + map.get("mc") + "%");
        }
        if (map.containsKey("state")) {
            hql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return wuZiLeiBieDao.getPageList(hql, parameters.toArray(), Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

    @Override
    public boolean existWuZiLeiBie(Integer qy_id, Integer id, String mc) {
        return wuZiLeiBieDao.existWuZiLeiBie(qy_id, id, mc);
    }

}
