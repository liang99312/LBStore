/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.XuQiuDao;
import com.lb.lbstore.domain.XuQiu;
import com.lb.lbstore.service.XuQiuService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("xuQiuServiceImpl")
public class XuQiuServiceImpl implements XuQiuService {

    @Autowired
    private XuQiuDao xuQiuDao;

    @Override
    public XuQiu getXuQiuById(Integer id) {
        return (XuQiu) xuQiuDao.findObjectById(XuQiu.class, id);
    }

    @Override
    public List<XuQiu> getAllXuQius(Integer qy_id) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        return xuQiuDao.getResult("from XuQiu xuQiu where qy_id=?", parameters.toArray());
    }

    @Override
    public boolean updateXuQiu(XuQiu xuQiu) {
        return xuQiuDao.update(xuQiu);
    }

    @Override
    public XuQiu saveXuQiu(XuQiu xuQiu) {
        int id = xuQiuDao.save(xuQiu);
        return (XuQiu) xuQiuDao.findObjectById(XuQiu.class, id);
    }

    @Override
    public boolean deleteXuQiu(Integer id) {
        XuQiu xuQiu = (XuQiu) xuQiuDao.findObjectById(XuQiu.class, id);
        if (xuQiu.getState() == 0) {
            xuQiu.setState(-1);
            return xuQiuDao.update(xuQiu);
        } else if (xuQiu.getState() == -1) {
            return xuQiuDao.deleteObjById("xuQiu", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from XuQiu where qy_id=?";
        if (map.containsKey("mc")) {
            sql += " and mc like ?";
            parameters.add("%" + map.get("mc") + "%");
        }
        if (map.containsKey("state")) {
            sql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return xuQiuDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<XuQiu> queryXuQiusByPage(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String hql = "from XuQiu where qy_id=?";
        if (map.containsKey("mc")) {
            hql += " and mc like ?";
            parameters.add("%" + map.get("mc") + "%");
        }
        if (map.containsKey("state")) {
            hql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return xuQiuDao.getPageList(hql, parameters.toArray(), Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

    @Override
    public boolean existXuQiu(Integer qy_id, Integer id, String mc) {
        return xuQiuDao.existXuQiu(qy_id, id, mc);
    }

}
